package com.managingsoftware.playyum.YumScore;
import java.sql.Date;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;


@Entity
@Data
@RequiredArgsConstructor
public class Score {
    @javax.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private long userid;
    private Date startdate;
    private Date finishdate;
    private int  ones;
    private int  twos;
    private int  threes;
    private int  fours;
    private int  fives;
    private int  sixes;
    private int  threeofakind;
    private int  fourofakind;
    private int  fullhouse;
    private int  highroll;
    private int  yum;
    private int  smstraight;
    private int  lgstraight;
    private int  bonus;
    private int  total;
    private int  roll;
    private String dicestring;

    public long getUserId() {
        return userid;
    }
}
