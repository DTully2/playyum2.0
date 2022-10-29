package com.managingsoftware.playyum.ApplicationMembers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class MemberController {
    @Autowired
    private MemberRepository memberRepository;

    @GetMapping("/api/members")
    @ResponseBody  
    public ResponseEntity<Iterable<Member>> findAll(@RequestParam(required = false) String username, @RequestParam(required = false)String password) {
       if(username == null && password == null) {
         
        Iterable<Member> members = memberRepository.findAll();
        return new ResponseEntity<Iterable<Member>>(members, HttpStatus.OK);}
        else{
           
            Member member = (Member) memberRepository.findByUsernameAndPassword(username, password);
            System.out.println(
                "memberid"+member.getId()
            ); 
            return new ResponseEntity<Iterable<Member>>(HttpStatus.OK);
        }
    }

    @PutMapping("/api/members")
    public ResponseEntity<Member> updateOne(@RequestBody Member member) {
        Member updatedMembers = memberRepository.save(member);
        return new ResponseEntity<Member>(updatedMembers, HttpStatus.OK);
    }

    // @PostMapping("/api/members/login")
    // public ResponseEntity<Member> loginUser(@RequestBody Member member) {
    //     Member newMember = memberRepository.findByUserId(member.getId());
    //     if(member.getPassword().equals(newMember.getPassword())){
    //         return new ResponseEntity<Member>(newMember, HttpStatus.OK);
    //     }
    // return (ResponseEntity<Member>) ResponseEntity.internalServerError();
    // }

    @PostMapping("/api/members")
    public ResponseEntity<Member> addOne(@RequestBody Member member) {
        Member newMember = memberRepository.save(member);
    return new ResponseEntity<Member>(newMember, HttpStatus.OK);
    }
    @DeleteMapping("/api/members/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable long id) {
    return new ResponseEntity<Integer>(memberRepository.deleteOne(id), HttpStatus.OK);
    }
}
