/* 

this class is to record purchase history

*/ 

package com.managingsoftware.playyum.Shop;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Data
@RequiredArgsConstructor
public class ItemShop {
   @javax.persistence.Id
   private String id; // member's id + Item id
   private Long itemId;
   private Long memberId;
   @JsonFormat(pattern="yyyy-MM-dd")
   private LocalDateTime purchaseDate; 
}
