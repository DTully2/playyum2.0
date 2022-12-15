package com.managingsoftware.playyum.ApplicationMembers;

import java.util.Optional;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.managingsoftware.playyum.Shop.ItemShop;
import com.managingsoftware.playyum.Shop.ItemShopRepository;

@CrossOrigin
@RestController
public class MemberController {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ItemShopRepository itemShopRepository;

    @GetMapping("/api/members")
    @ResponseBody  
    public ResponseEntity<Iterable<Member>> findAll(@RequestParam(required = false) String username, @RequestParam(required = false)String password) {      
        Iterable<Member> members = memberRepository.findAll();
        return new ResponseEntity<Iterable<Member>>(members, HttpStatus.OK);
    }

    @GetMapping("api/members/login")
    @ResponseBody
    public ResponseEntity<Member> confirmLogin(@RequestParam(required = true) String username, @RequestParam(required = true)String password) {
        Iterable<Member> members = memberRepository.findAll();
        ArrayList<Member> memberArray = new ArrayList<Member>();
        members.forEach(mbr -> memberArray.add((mbr)));
        for(int i = 0; i < memberArray.size(); i++){
            System.out.println(memberArray.get(i).getUsername() + "==" + username + "|" + memberArray.get(i).getPassword() + "==" + password);
            if(memberArray.get(i).getUsername().equals(username) && memberArray.get(i).getPassword().equals(password)){
                System.out.println(memberArray.get(i));
                return new ResponseEntity<Member>(memberArray.get(i), HttpStatus.OK); 
            }
        }
        return new ResponseEntity<Member>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/api/members/{id}")
    @ResponseBody  
    public ResponseEntity<Member> findOne(@PathVariable long id) {
        Optional<Member> member = memberRepository.findById(id);
        if(member.isPresent()){
            return new ResponseEntity<Member>(member.get(), HttpStatus.OK);
        }
        return new ResponseEntity<Member>(HttpStatus.BAD_REQUEST);
            
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
        member.setDice("white");
        Member newMember = memberRepository.save(member);
        ItemShop defaultDice = new ItemShop();
        defaultDice.setItemId((long)1);
        defaultDice.setMemberId(newMember.getId());
        itemShopRepository.save(defaultDice);
    return new ResponseEntity<Member>(newMember, HttpStatus.OK);
    }
    @DeleteMapping("/api/members/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable long id) {
    return new ResponseEntity<Integer>(memberRepository.deleteOne(id), HttpStatus.OK);
    }
}
