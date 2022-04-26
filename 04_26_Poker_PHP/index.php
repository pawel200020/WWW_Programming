<html>

<head>
    <meta charset="UTF-8">
</head>

<body>

    <?php
    class Cart
    {
        var $color;
        var $figure;
        var $symbol;
        function __construct($color = null, $figure = null, $symbol = null)
        {
            $this->color = $color;
            $this->figure = $figure;
            $this->symbol = $symbol;
        }
    }
    class Player
    {
        var $cart1;
        var $cart2;
        function __construct($cart1 = null, $cart2 = null)
        {
            $this->cart1 = $cart1;
            $this->cart2 = $cart2;
        }
    }
    class Game
    {
        var $players;
        function __construct($players = null)
        {
            $this->players = $players;
        }
        function play()
        {
            $playerNumber = 5;
            $playerCarts = 2;
            $commonCarts = 3;
            /*
                52 karty
                zasady losowania rodzaju karty:
                1,2,3,4,5,6,7,8,9,10
                11 as,
                12 krol,
                13 dama,
                14 walet
                zasady losowania figury na karcie:
                0 - pik
                1 - trefl
                2 - kier
                3 - karo
                zasady losowania koloru
                0 - black 
                1 - red
                UWAGA KARTY NIE MOGĄ SIĘ POWTARZAĆ!!!!
            */
            $cartArray = (new Cart(rand(0, 1),rand(0, 3),rand(1,14)));
            //$player = new Player(new Cart(rand(0, 1),rand(0, 3),rand(1,14)),);
            //$playerArray = ($player);
            //losujemy 2 karty dla każdego gracza
            for ($i = 1; $i <= ($playerNumber*$playerCarts)+$commonCarts; $i++) {
                echo $i;
            }
            //losujemy 3 wspolne karty
            //sprawdzamy kto wygra


        }
    }
    $mynumber = rand(5, 15);
    ?>
    <div>
        <? echo $mynumber ?>
    </div>

</body>

</html>