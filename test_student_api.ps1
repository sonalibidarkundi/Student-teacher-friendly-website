
# Test creating student via signup endpoint
$timestamp = Get-Date -Format "yyyyMMddHHmmssfff"
$uniqueUsername = "student_api_$timestamp"

$body = @{
    username = $uniqueUsername
    password = "pass1234"
    role = "student"
} | ConvertTo-Json

Write-Host "Creating student via signup API: $uniqueUsername"

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/clerk/signup" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
    Write-Host "Signup Status Code: $($response.StatusCode)"
    Write-Host "Signup Response: $($response.Content)"
} catch {
    Write-Host "Signup Error: $($_.Exception.Message)"
}

# Now try to login with the new student
Write-Host "`nTrying to login with new student..."

$loginBody = @{
    username = $uniqueUsername
    password = "pass1234"
} | ConvertTo-Json

try {
    $loginResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/clerk/login" -Method POST -Body $loginBody -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
    Write-Host "Login Status Code: $($loginResponse.StatusCode)"
    Write-Host "Login Response: $($loginResponse.Content)"
} catch {
    Write-Host "Login Error: $($_.Exception.Message)"
}

