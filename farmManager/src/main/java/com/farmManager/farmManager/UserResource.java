package com.farmManager.farmManager;

import com.farmManager.farmManager.model.User;
import com.farmManager.farmManager.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/user")
public class UserResource {

    private final UserService userService;

    public UserResource(UserService userService){ this.userService = userService;}

    @GetMapping("/find/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id){
        User user = userService.findUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user){
        List<User> users = userService.findAllUsers();
        User foundUser = null;
        for (User searchedUser : users) {
            if (searchedUser.getUsername().equals(user.getUsername())) {
                foundUser = searchedUser;
                break;
            }
        }

        if(foundUser != null) {
            BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
            boolean isPasswordCorrect = passwordEncoder.matches(user.getPassword(), foundUser.getPassword());
            if(isPasswordCorrect){
                return new ResponseEntity<>(true, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }

    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        String userPassword = user.getPassword();
        String hashedPassword = passwordEncoder.encode(userPassword);
        user.setPassword(hashedPassword);
        userService.addUser(user);
        return new ResponseEntity<>(HttpStatus.OK);

    }
}
