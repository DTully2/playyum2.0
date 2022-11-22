package com.managingsoftware.playyum.YumScore;

import java.util.Optional;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class ScoreController {
    @Autowired
    private ScoreRepository scoreRepository;

    @GetMapping("/api/scores")
    @ResponseBody  
    public ResponseEntity<Iterable<Score>> findAll(@RequestParam(required = false) String username, @RequestParam(required = false)String password) {      
        Iterable<Score> scores = scoreRepository.findAll();
        return new ResponseEntity<Iterable<Score>>(scores, HttpStatus.OK);
    }

    @GetMapping("/api/scores/unfinished/{id}")
    @ResponseBody  
    public ResponseEntity<Score> findUnfinishedByUserId(@PathVariable long id) {      
        Iterable<Score> scores = scoreRepository.findAll();
        for(Score score : scores){
            if(score.getFinishdate() == null){
                return new ResponseEntity<Score>(score, HttpStatus.OK);
            }
        }
        return new ResponseEntity<Score>(new Score(), HttpStatus.OK);
    }

    @GetMapping("/api/scores/{id}")
    @ResponseBody  
    public ResponseEntity<Iterable<Score>> findByUserId(@PathVariable long id) {
        Iterable<Score> score = scoreRepository.findAll();
        ArrayList<Score> retScores = new ArrayList<Score>();
        for(Score iscore : score) {
            if(iscore.getUserId() == id){
                retScores.add(iscore);
            }
        }
        return new ResponseEntity<Iterable<Score>>(retScores, HttpStatus.OK);        
    }

    @PutMapping("/api/scores")
    public ResponseEntity<Score> updateOne(@RequestBody Score score) {
        System.out.println(score);
        Score updatedScores = scoreRepository.save(score);
        return new ResponseEntity<Score>(updatedScores, HttpStatus.OK);
    }

    @PostMapping("/api/scores")
    public ResponseEntity<Score> addOne(@RequestBody Score score) {
        Score newScore = scoreRepository.save(score);
    return new ResponseEntity<Score>(newScore, HttpStatus.OK);
    }
    @DeleteMapping("/api/scores/{id}")
    public ResponseEntity<Integer> deleteOne(@PathVariable long id) {
    return new ResponseEntity<Integer>(scoreRepository.deleteOne(id), HttpStatus.OK);
    }
}
