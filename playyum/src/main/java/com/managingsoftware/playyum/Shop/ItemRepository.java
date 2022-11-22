package com.managingsoftware.playyum.Shop;


import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ItemRepository extends CrudRepository<Item, Long> {
    @Modifying
    @Transactional
    @Query("delete from Item where id = ?1")
    int deleteOne(Long id);
}
