package com.managingsoftware.playyum.Shop;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
@Repository
public interface ItemShopRepository extends CrudRepository<ItemShop, Long> {
    @Modifying
    @Transactional
    @Query("delete from ItemShop where id = ?1")
    int deleteOne(String Id);

}
