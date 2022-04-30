<html>

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css" />
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
            //echo '<li>' . 'black ' . $this->figure . ' ' . $this->symbol . '</a></li>';
            $returnStr = '<li>';
            if ($this->color === 0) {
                $returnStr .= 'black ';
            } else {
                $returnStr .= 'red ';
            }

            switch ($this->figure) {
                case 0:
                    $returnStr .= 'pik ';
                    break;
                case 1:
                    $returnStr .= 'trefl ';
                    break;
                case 2:
                    $returnStr .= 'kier ';
                    break;
                case 3:
                    $returnStr .= 'karo ';
                    break;
            }
            if ($this->symbol <= 10) {
                $returnStr .= $this->symbol;
            } else if ($this->symbol == 11) {
                $returnStr .= 'walet';
            } else if ($this->symbol == 12) {
                $returnStr .= 'dama ';
            } else if ($this->symbol == 13) {
                $returnStr .= 'krol ';
            } else if ($this->symbol == 14) {
                $returnStr .= 'as ';
            }
            echo $returnStr;
        }
        function compare($cart1)
        {
            if ((($cart1->color == $this->color) && ($cart1->figure == $this->figure)) && ($cart1->symbol == $this->symbol)) {
                return true;
            } else {
                return false;
            }
        }
    }
    class Player
    {
        var $id;
        var $cartArray = array();
        function __construct($cartArray = null, $id= null)
        {
            $this->cartArray = $cartArray;
            $this->id = $id;
        }
        function print()
        {
            echo '<div id="rcorners1">';
            echo '<p>Player ' . $this->id.'</p>';
            echo '<ul>';
            foreach ($this->cartArray as $item)
                $item->print();
            echo '</ul>';
            echo'</div>';
        }
        function getScore($commonCartArray)
        {
            $result = 0;
            foreach ($this->cartArray as $item) {
                $result += $item->symbol;
            }
            foreach ($commonCartArray as $item) {
                $result += $item->symbol;
            }
            return $result;
        }
    }
    class Game
    {
        var $playerNumber;
        var $playerCarts;
        var $commonCarts;

        function __construct($playerNumber,  $playerCarts, $commonCarts)
        {
            $this->playerNumber = $playerNumber;
            $this->playerCarts = $playerCarts;
            $this->commonCarts = $commonCarts;
        }
        protected function commonCardsInOneColor($commonCartArray)
        {
            $red = 0;
            $black = 0;
            foreach ($commonCartArray as $value) {
                if ($value->color == 0) {
                    $red++;
                } else {
                    $black++;
                }
            }
            if ($red == 0 || $black == 0) {
                return true;
            } else {
                return false;
            }
        }
        function play()
        {

            /*
                52 karty
                zasady losowania rodzaju karty:
                2,3,4,5,6,7,8,9,10
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

            //losujemy 3 wspolne karty
            //sprawdzamy kto wygra
            $cartArray = array();
            array_push($cartArray, new Cart(rand(0, 1), rand(0, 3), rand(2, 14)));
            for ($i = 2; $i <= ($this->playerNumber * $this->playerCarts) + $this->commonCarts; $i++) {
                $cart = new Cart(rand(0, 1), rand(0, 3), rand(1, 14));
                $wasOnList = false;
                while (true) {
                    foreach ($cartArray as $value) {
                        if ($value->compare($cart)) {
                            $wasOnList = true;
                            break;
                        }
                    }
                    if ($wasOnList) {
                        $cart = new Cart(rand(0, 1), rand(0, 3), rand(2, 14));
                    } else {
                        break;
                    }
                    break;
                }
                array_push($cartArray, $cart);
            }
            echo '<ul>';
            // foreach ($cartArray as $item) {
            //     $item->print();
            // }
            echo '</ul>';
            $playerArray = array();
            $commonCartArray = array();
            $var = 0;
            for ($i = 0; $i < $this->playerNumber * $this->playerCarts; $i += $this->playerCarts) {
                $arrayTopush = array();
                for ($j = 0; $j < $this->playerCarts; $j++) {
                    array_push($arrayTopush, $cartArray[$i + $j]);
                }
                array_push($playerArray, new Player($arrayTopush, $var));
                $var++;
            }
            for ($i = $this->playerCarts * $this->playerNumber; $i < $this->commonCarts + $this->playerCarts * $this->playerNumber; $i++) {
                array_push($commonCartArray, ($cartArray[$i]));
            }
            echo '<div id="rcorners2">';
            echo '<p> common cards </p>';
            echo '<ul>';
            foreach ($commonCartArray as $item) {
                $item->print();
            }
            echo '</ul>';
            echo '</div>';
            $i = 0;
            foreach ($playerArray as $item) {
                $item->print();
            }
            //check winner
            $highest = 0;
            $winners = array();
            foreach ($playerArray as $item) {
                if ($highest < $item->getScore($commonCartArray)) {
                    $highest = $item->getScore($commonCartArray);
                    $winners = array();
                    array_push($winners,$item->id);
                } else if($highest == $item->getScore($commonCartArray)){
                    array_push($winners,$item->id);
                }
            }
            echo '<div id="rcorners3">';
            foreach($winners as $item){
                echo '<p id ="winner" >won player '.$item.' with score '.$highest.'</p>';
            }
            echo '</div>';
        }
    }
    $game = new Game(5, 2, 3);
    $game->play();
    ?>

</body>

</html>