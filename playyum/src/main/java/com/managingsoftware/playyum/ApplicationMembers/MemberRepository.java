package com.managingsoftware.playyum.ApplicationMembers;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@Repository
@RepositoryRestResource(collectionResourceRel = "members", path = "members")
public interface MemberRepository extends CrudRepository<Member, Long> {
}
