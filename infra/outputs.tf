output "website_url" {
  description = "Website URL"
  value       = aws_cloudfront_distribution.cdn.domain_name
}
