<html>

<head>
    <meta charset="UTF-8">
</head>

<body>
    <?php
    if (isset($_POST["pln"])) {
        $pln = $_POST["pln"];
        $usd = (int)$pln / 3.6;
    } else {
        $pln = "";
    }
    ?>
    <form action="http://localhost:8080/" method="post">
        <input type="text" name="pln" value="<? echo $pln ?>">
        <input type="text" name="usd" value="<? echo $usd ?>">
        <input type="submit" value="pzelicz">
    </form>
</body>

</html>