vault {
  address = "http://vault:8200"
  retry {
    num_retries = 5
    backoff = "1s"
  }
}

auto_auth {
  method "approle" {
    mount_path = "auth/approle"
    config = {
      role_id_file_path = "/etc/vault/role-id"
      secret_id_file_path = "/etc/vault/secret-id"
      remove_secret_id_file_after_reading = false
    }
  }

  token_ttl = "1h"
  token_max_ttl = "2h"
  token_retry {
    num_retries = 3
    backoff = "15s"
  }

  sink "file" {
    config = {
      path = "/etc/vault/token"
    }
  }
}

secret_id_renewal {
  enabled = true
  role_name = "your-service-role"
  secret_id_file_path = "/etc/vault/secret-id"
  update_file = true
}
