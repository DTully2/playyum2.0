package com.managingsoftware.playyum.Shop;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class ItemShopController {
    @Autowired
    private ItemShopRepository itemShopRepository;

    @PostMapping("/api/itemshop")
    public ResponseEntity<ItemShop> addOne(@RequestBody ItemShop clientrep) { // use RequestBody here
        clientrep.setPurchaseDate(LocalDateTime.now());
        ItemShop itemshop = itemShopRepository.save(clientrep);
        return new ResponseEntity<ItemShop>(itemshop , HttpStatus.OK);
    }

    @GetMapping("/api/itemshop")
    public ResponseEntity<Iterable<ItemShop>> findAll() {
        Iterable<ItemShop> pos = itemShopRepository.findAll();
        return new ResponseEntity<Iterable<ItemShop>>(pos, HttpStatus.OK);
    }


}
