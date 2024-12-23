//192.168.0.150
//192.168.0.150
/* Edge Impulse Arduino examples for Xiao ESP32S3
 * Adapted by Marcelo Rovai for Xiao ESP32S3
 * Edge Impulse model integration with voice recognition using keywords
 */

#include <WiFi.h>
#include <keyword_spotting_practice_inferencing.h>
#include <I2S.h>

#define SAMPLE_RATE 16000U
#define SAMPLE_BITS 16
int led=2;
const char *ssid = "Jaffa";             // Replace with your WiFi SSID
const char *password = "pikachu45";  // Your Wi-Fi password
const char* target_ip = "192.168.142.106"; // IP of the other ESP32

typedef struct {
    int16_t *buffer;
    uint8_t buf_ready;
    uint32_t buf_count;
    uint32_t n_samples;
} inference_t;

static inference_t inference;
static const uint32_t sample_buffer_size = 2048;
static signed short sampleBuffer[sample_buffer_size];
static bool record_status = true;
static bool debug_nn = false; // Set to true to see debug data

// Function prototypes
void capture_samples(void* arg);
void audio_inference_callback(uint32_t n_bytes);
bool microphone_inference_start(uint32_t n_samples);
bool microphone_inference_record(void);
void send_data_to_target(const char* keyword, float confidence);

void setup() {
    Serial.begin(115200);
    while (!Serial);

    Serial.println("Edge Impulse Inferencing Demo");

    // Connect to WiFi
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi!");

    // Initialize I2S for microphone input
    I2S.setAllPins(-1, 42, 41, -1, -1);
    if (!I2S.begin(PDM_MONO_MODE, SAMPLE_RATE, SAMPLE_BITS)) {
        Serial.println("Failed to initialize I2S!");
        while (1);
    }

    if (!microphone_inference_start(EI_CLASSIFIER_RAW_SAMPLE_COUNT)) {
        Serial.println("ERR: Could not allocate audio buffer.");
        return;
    }
    // pinMode(2,OUTPUT);//
    Serial.println("Starting continuous inference in 2 seconds...");
    delay(2000);
}

void loop() {
    if (!microphone_inference_record()) {
        Serial.println("ERR: Failed to record audio...");
        return;
    }

    signal_t signal;
    signal.total_length = EI_CLASSIFIER_RAW_SAMPLE_COUNT;
    signal.get_data = &microphone_audio_signal_get_data;
    ei_impulse_result_t result = {0};

    EI_IMPULSE_ERROR r = run_classifier(&signal, &result, debug_nn);
    if (r != EI_IMPULSE_OK) {
        Serial.printf("ERR: Failed to run classifier (%d)\n", r);
        return;
    }

    // Process predictions
    const char* detected_label = "";
    float max_value = 0.0f;
    for (size_t ix = 0; ix < EI_CLASSIFIER_LABEL_COUNT; ix++) {
        if (result.classification[ix].value > max_value) {
            max_value = result.classification[ix].value;
            detected_label = result.classification[ix].label;
        }
    }
    if (max_value > 0.4) { // Confidence threshold
        Serial.printf("Detected keyword: %s with confidence: %.2f\n", detected_label, max_value);
        send_data_to_target(detected_label, max_value);
    }
    delay(2000);
}

void capture_samples(void* arg) {
    const int32_t i2s_bytes_to_read = (uint32_t)arg;
    size_t bytes_read;

    while (record_status) {
        esp_i2s::i2s_read(esp_i2s::I2S_NUM_0, (void*)sampleBuffer, i2s_bytes_to_read, &bytes_read, 100);

        if (bytes_read > 0) {
            // Amplify signal
            for (int x = 0; x < i2s_bytes_to_read / 2; x++) {
                sampleBuffer[x] = (int16_t)(sampleBuffer[x]) * 8;
            }
            audio_inference_callback(i2s_bytes_to_read);
        }
    }
    vTaskDelete(NULL);
}

void audio_inference_callback(uint32_t n_bytes) {
    for (int i = 0; i < n_bytes >> 1; i++) {
        inference.buffer[inference.buf_count++] = sampleBuffer[i];
        if (inference.buf_count >= inference.n_samples) {
            inference.buf_count = 0;
            inference.buf_ready = 1;
        }
    }
}

bool microphone_inference_start(uint32_t n_samples) {
    inference.buffer = (int16_t *)malloc(n_samples * sizeof(int16_t));
    if (!inference.buffer) {
        return false;
    }
    inference.buf_count = 0;
    inference.n_samples = n_samples;
    inference.buf_ready = 0;

    record_status = true;
    xTaskCreate(capture_samples, "CaptureSamples", 1024 * 32, (void*)sample_buffer_size, 10, NULL);
    return true;
}

bool microphone_inference_record(void) {
    while (inference.buf_ready == 0) {
        delay(10);
    }
    inference.buf_ready = 0;
    return true;
}

int microphone_audio_signal_get_data(size_t offset, size_t length, float *out_ptr) {
    numpy::int16_to_float(&inference.buffer[offset], out_ptr, length);
    return 0;
}

void microphone_inference_end(void) {
    free(inference.buffer);
}

void send_data_to_target(const char* keyword, float confidence) {
    WiFiClient client;
    if (!client.connect(target_ip, 90)) {
        Serial.println("Connection to target ESP32 failed");
        return;
    }

    // Send data
    client.printf("Detected: %s, Confidence: %.2f", keyword, confidence);
    client.stop();
}