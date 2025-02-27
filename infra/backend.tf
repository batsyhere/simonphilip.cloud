terraform {
  backend "s3" {
    bucket         = "simonphilip-cloud-tf-state"
    key            = "terraform.tfstate"
    region         = "ap-south-1"
    encrypt        =  true
  }
}
