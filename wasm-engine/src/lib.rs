use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct AegixEngine;

#[wasm_bindgen]
impl AegixEngine {
    pub fn new() -> AegixEngine {
        AegixEngine
    }

    pub fn process_command(&self, cmd: &str) -> String {
        let parts: Vec<&str> = cmd.trim().split_whitespace().collect();
        if parts.is_empty() {
            return String::new();
        }

        match parts[0] {
            "genkey" => self.generate_mock_key(),
            "verify" => {
                if parts.len() < 2 {
                    "ERROR: Usage 'verify <token>'".to_string()
                } else {
                    self.verify_simulated_jwt(parts[1])
                }
            },
            "encrypt" => {
                if parts.len() < 2 {
                    "ERROR: Usage 'encrypt <data>'".to_string()
                } else {
                    self.mock_encrypt(parts[1])
                }
            },
            _ => "UNKNOWN_COMMAND: Redirecting to host engine...".to_string(),
        }
    }

    fn generate_mock_key(&self) -> String {
        let key: String = (0..32)
            .map(|_| {
                let r = rand::random::<u8>() % 16;
                format!("{:x}", r)
            })
            .collect();
        format!("[SUCCESS] Generated 256-bit AES Key: 0x{}", key)
    }

    fn verify_simulated_jwt(&self, token: &str) -> String {
        if token.starts_with("eyJ") && token.contains(".") {
            "[VALID] JWT Signature Matched. Principal: aegix-admin. Scope: full-access.".to_string()
        } else {
            "[INVALID] Signature Mismatch or Malformed Token.".to_string()
        }
    }

    fn mock_encrypt(&self, data: &str) -> String {
        let encrypted: String = data.chars().map(|c| (c as u8 ^ 0x42) as char).collect();
        format!("[SUCCESS] Encrypted Payload (XOR-42): {}", encrypted)
    }
}
