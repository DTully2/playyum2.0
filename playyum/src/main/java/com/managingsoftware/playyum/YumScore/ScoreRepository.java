package com.managingsoftware.playyum.YumScore;
import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Repository
@RepositoryRestResource(collectionResourceRel = "score", path = "score")
public interface ScoreRepository extends CrudRepository<Score, Long> {

    @Modifying
    @Transactional
    @Query("delete from Score where id = ?1")
    int deleteOne(Long memberid);
    // Member findByUsernameAndPassword(String username, String password);
}
