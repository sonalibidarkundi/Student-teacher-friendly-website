
$timestamp = Get-Date -Format "yyyyMMddHHmmssfff"
$uniqueUsername = "testuser_$timestamp"

$body = @{
    username = $uniqueUsername
    password = "pass1234"
    role = "student"
} | ConvertTo-Json

Write-Host "Testing user creation with username: $uniqueUsername"
Write-Host "Request body: $body"

try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/clerk/signup" -Method POST -Body $body -ContentType "application/json" -UseBasicParsing -ErrorAction Stop
    Write-Host "Status Code: $($response.StatusCode)"
    Write-Host "Response: $($response.Content)"
} catch {
    Write-Host "Status Code: $($_.Exception.Response.StatusCode)"
    Write-Host "Error: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $errorBody = $reader.ReadToEnd()
        Write-Host "Response Body: $errorBody"
    }
}

