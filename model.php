<?php

class Database
{
    // erreur tato le host, nom table facture sans "s" ary reseived
    private $host = 'mysql:host=localhost;dbname=crud_ajax';
    private $user = 'root';
    private $password = '';

    private function getconnexion()
    {
        try {
            return new PDO($this->host, $this->user, $this->password);
        } catch (PDOException $e) {
            die('erreur:' . $e->getMessage());
        }
    }
    public function create(string $customer, string $cashier, int $amount, int $received, int $returned, string $state)
    {
        $q = $this->getconnexion()->prepare("INSERT INTO facture(customer, cashier, amount, reseived,returned,state)
         VALUES (:customer, :cashier, :amount, :received, :returned, :state)");
        return $q->execute([
            'customer' => $customer,
            'cashier' => $cashier,
            'amount' => $amount,
            'received' => $received,
            'returned' => $returned,
            'state' => $state
        ]);
    }
    public function read()
    {
        return $this->getconnexion()->query( "SELECT * FROM facture ORDER BY id")->fetchAll(PDO::FETCH_OBJ);
    }
    public function countBills(): int{
        return(int)$this->getconnexion()->query( "SELECT COUNT(id) as count FROM facture")->fetch()[0];
    }
}