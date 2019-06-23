<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/css/app.css">
    <title>Document</title>
    @auth
        <script>
            window.loggedIn = true
        </script>
    @endauth
</head>
<body>
    <div id="react"></div>
    <script src="/js/app.js"></script>
</body>
</html>