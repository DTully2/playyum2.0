package com.managingsoftware.playyum.ApplicationMembers;
import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Repository
@RepositoryRestResource(collectionResourceRel = "members", path = "members")
public interface MemberRepository extends CrudRepository<Member, Long> {

    @Modifying
    @Transactional
    @Query("delete from Member where id = ?1")
    int deleteOne(Long memberid);

    // Member findById(long id);

    Object findByUsernameAndPassword(String username, String password);
}
