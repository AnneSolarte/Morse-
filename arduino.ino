/* int player1;
int player2;

int pinButton1 = 3;
int pinButton2 = 5;

void setup() {
  Serial.begin(9600);
  Serial.println("Arduino Server Started");

  pinMode(pinButton1, INPUT);
  pinMode(pinButton2, INPUT);

}

void loop() {

  if(digitalRead(pinButton1) == HIGH){
    Serial.println(1);
  }
  if(digitalRead(pinButton2) == HIGH){
    Serial.println(2);
  }

  delay(250);
} */