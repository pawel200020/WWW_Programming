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
        function print()
        {
            echo '<li>' . $this->color . ' ' . $this->figure . ' ' . $this->symbol . '</a></li>';
        }
        function compare ($cart1){
            if ((($cart1->color == $this->color) && ($cart1->figure == $this->figure)) && ($cart1->symbol == $this->symbol)) {
                return true;
            } else {
                return false;
            }
        }
    }
    class Player
    {
        var $cartArray = array();
        function __construct($cartArray = null)
        {
            $this->cartArray = $cartArray;
        }
        function print()
        {
            echo 'player' . '<br>';
            echo '<ul>';
            foreach ($this->cartArray as $item)
                $item->print();
            echo '</ul>';
        }
    }
    class Game
    {
        
        function __construct()
        {
            ;
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
            $cartArray = array();
            array_push($cartArray, new Cart(rand(0, 1), rand(0, 3), rand(1, 14)));
            //$player = new Player(new Cart(rand(0, 1),rand(0, 3),rand(1,14)),);
            //$playerArray = ($player);
            //losujemy 2 karty dla każdego gracza
            //($playerNumber * $playerCarts) + $commonCarts
            for ($i = 2; $i <= ($playerNumber * 2) + $commonCarts; $i++) {
                $cart = new Cart(rand(0, 1), rand(0, 3), rand(1, 14));
                $wasOnList = false;
                while (true) {
                    foreach ($cartArray as $value) {
                        if ($value->compare($cart)) {
                            $wasOnList = true;
                            echo 'was:' . $wasOnList;
                            break;
                        }
                    }
                    if ($wasOnList) {
                        $cart = new Cart(rand(0, 1), rand(0, 3), rand(1, 14));
                    } else {
                        break;
                    }
                    break;
                }
                array_push($cartArray, $cart);
            }
            echo '<ul>';
            foreach ($cartArray as $item) {
                $item->print();
            }
            echo '</ul>';
            $playerArray = array();
            $commonCartArray = array();
            for ($i = 0; $i < $playerNumber*$playerCarts; $i += $playerCarts) {
                $arrayTopush = array();
                for($j=0; $j<$playerCarts; $j++){
                    array_push($arrayTopush,$cartArray[$i+$j]);
                }
                array_push($playerArray, new Player($arrayTopush));

            }
            for ($i = $playerCarts * $playerNumber; $i < $commonCarts + $playerCarts * $playerNumber; $i++) {
                array_push($commonCartArray, ($cartArray[$i]));
            }
            echo '<br>';
            echo 'common cards <br>';
            echo '<ul>';
            foreach ($commonCartArray as $item) {
                $item->print();
            }
            echo '</ul>';
            $i = 0;
            foreach ($playerArray as $item) {
                $item->print();
            }

            //losujemy 3 wspolne karty
            //sprawdzamy kto wygra


        }
    }
    $game = new Game();
    $game->play();
    $mynumber = rand(5, 15);
    ?>
    <div>
        <? echo $mynumber ?>
    </div>

</body>

</html>