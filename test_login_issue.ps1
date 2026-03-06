# Test login with created student
$body = @{
    username = "student999"
    password = "pass123"
} | ConvertTo-Json

Write-Host "Testing login with username: student999"

$response = Invoke-WebRequest -Uri "http://localhost:5000/api/clerk/login" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing
Write-Host "Status: $($response.StatusCode)"
Write-Host "Response: $($response.Content)"
