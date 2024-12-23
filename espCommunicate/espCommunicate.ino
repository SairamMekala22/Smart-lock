#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

const char *ssid = "Jaffa";             // Replace with your WiFi SSID
const char *password = "pikachu45";  // Replace with your WiFi password
int a = 0;





WiFiServer server2(90);

// Pin configurations for fan and bulb
const int LOCK_PIN = 5;   // Change this to the GPIO pin connected to the fan

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

// Variables to store the state of the fan and bulb
bool lockState = false;
// bool bulbState = false;

void handleCORS(AsyncWebServerRequest *request) {
  request->send(204);  // No content for preflight
}

void toggleLock(bool state) {
  lockState = state;
  digitalWrite(LOCK_PIN, lockState ? HIGH : LOW);
  Serial.println(lockState ? "Locked" : "Unlocked");
}


void setup() {
  Serial.begin(115200);
 
  // Configure fan and bulb pins as output
  pinMode(LOCK_PIN, OUTPUT);
  // pinMode(39, OUTPUT);
  // pinMode(11, OUTPUT);
  // pinMode(BULB_PIN, OUTPUT);

  digitalWrite(LOCK_PIN, LOW);  

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Enable CORS headers
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Origin", "*");
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  DefaultHeaders::Instance().addHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS requests for CORS
  server.on("/lock/toggle", HTTP_OPTIONS, [](AsyncWebServerRequest *request) {
    handleCORS(request);
  });
  server.on("/lock/status", HTTP_OPTIONS, [](AsyncWebServerRequest *request) {
    handleCORS(request);
  });
  server.on("/toggle", HTTP_OPTIONS, [](AsyncWebServerRequest *request) {
    handleCORS(request);
  });
  server.on("/status", HTTP_OPTIONS, [](AsyncWebServerRequest *request) {
    handleCORS(request);
  });

  // Route for getting fan status
  server.on("/lock/status", HTTP_GET, [](AsyncWebServerRequest *request) {
    StaticJsonDocument<200> doc;
    doc["state"] = lockState ? 1 : 0;

    String response;
    serializeJson(doc, response);
    request->send(200, "application/json", response);
  });

  // Route for toggling fan
  server.on(
    "/lock/toggle", HTTP_POST, [](AsyncWebServerRequest *request) {}, NULL,
    [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
      StaticJsonDocument<200> doc;
      DeserializationError error = deserializeJson(doc, (char *)data);

      if (error) {
        String errorMsg = "Failed to parse JSON: " + String(error.c_str());
        request->send(400, "application/json", "{\"error\":\"" + errorMsg + "\"}");
        return;
      }

      const char *state = doc["state"];
      bool lockRequestedState = (strcmp(state, "1") == 0);  // State "1" means ON, "0" means OFF
      toggleLock(lockRequestedState);

      StaticJsonDocument<200> response;
      response["success"] = true;
      response["state"] = lockState ? 1 : 0;

      String jsonResponse;
      serializeJson(response, jsonResponse);
      request->send(200, "application/json", jsonResponse);
    });

    // digitalWrite(11, LOW);
    // digitalWrite(39, LOW);

 
  // Start the server
  server.begin();
  server2.begin();
}
void loop() {
  WiFiClient client = server2.available();
  if (client) {
    String request = client.readStringUntil('\r');
    Serial.println("\n");
    Serial.println(request);

    String keyword = extractKeyword(request);
    if (keyword.equals("Yes")) {  // Check if keyword is valid
      Serial.print("Received keyword: ");
      Serial.println(keyword);
      digitalWrite(LOCK_PIN, HIGH);
      lockState = true;  // Update bulbState to reflect LED state
    } else if (keyword.equals("No")) {
      digitalWrite(LOCK_PIN, LOW);
      lockState = false;  // Update bulbState to reflect LED state
    } 

    client.flush();
    client.println("HTTP/1.1 200 OK");
    client.println("Connection: close");
    client.println();
    client.stop();
  }

  delay(1500);  // Wait for 2 seconds before taking another reading
}


String extractKeyword(String input) {
  // Find the start and end indices for the keyword
  int startIndex = input.indexOf(':') + 2;  // +2 to skip ": "
  int endIndex = input.indexOf(',', startIndex);

  // Check if indices are valid
  if (startIndex > 1 && endIndex > startIndex) {
    // Extract the keyword
    String keyword = input.substring(startIndex, endIndex);
    Serial.print("Extracted keyword: ");
    Serial.println(keyword);
    return keyword;  // Return the extracted keyword
  }

  return "";  // Return an empty string if no valid keyword is found
}












