package com.managingsoftware.playyum.Shop;
import java.time.LocalDateTime;
import java.util.ArrayList;

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


    @PutMapping("/api/itemshop")
    public ResponseEntity<ItemShop> updateOne(@RequestBody ItemShop clientrep) { // use RequestBody here
        clientrep.setPurchaseDate(LocalDateTime.now());
        ItemShop itemshop = itemShopRepository.save(clientrep);
        return new ResponseEntity<ItemShop>(itemshop , HttpStatus.OK);
    }

    @GetMapping("/api/itemshop")
    public ResponseEntity<Iterable<ItemShop>> findAll() {
        Iterable<ItemShop> pos = itemShopRepository.findAll();
        return new ResponseEntity<Iterable<ItemShop>>(pos, HttpStatus.OK);
    }

    @GetMapping("/api/itemshop/{id}")
    public ResponseEntity<Iterable<ItemShop>> findByUserID(@PathVariable long id) {
        Iterable<ItemShop> pos = itemShopRepository.findAll();
        ArrayList<ItemShop> returnArray = new ArrayList<ItemShop>();
        pos.forEach(itm -> {if(itm.getMemberId() == id)returnArray.add(itm);} );
        return new ResponseEntity<Iterable<ItemShop>>(returnArray, HttpStatus.OK);
    }


    @DeleteMapping("/api/itemshop/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable String id) {
    return new ResponseEntity<Integer>(itemShopRepository.deleteOne(id), HttpStatus.OK);
    }
}
