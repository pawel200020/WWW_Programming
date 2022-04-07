<html>

<body>
    <div id="wrapper">

        <?php
        $myfile = fopen("content.txt", "r") or die("Unable to open file!");
        echo fread($myfile, filesize("content.txt"));
        fclose($myfile);
        ?>

    </div>
</body>

</html>