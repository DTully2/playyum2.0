package com.managingsoftware.playyum.Shop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class ItemController {
    @Autowired
    private ItemRepository itemRepo;
    
    @GetMapping("/api/items")
    public ResponseEntity<Iterable<Item>> findAll() {
        Iterable<Item> pos = itemRepo.findAll();
        return new ResponseEntity<Iterable<Item>>(pos, HttpStatus.OK);
    }// findAll()

    


}// End of class
