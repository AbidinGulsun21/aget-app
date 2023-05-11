package agetjava.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import agetjava.entity.Users;
import agetjava.repository.UsersRepository;

import java.util.List;
import java.util.Optional;


@Service
public class UserService {

		
	@Autowired
	private UsersRepository usersRepository;
	
	public List<Users> getAll(){
		return this.usersRepository.findAll();
	}
	
	
	public Optional<Users> getUsername(String username){
		return this.usersRepository.findByUsername(username);
	}
	
	
	
	public void addUser(Users users) {
	    String plainPassword = users.getPassword();
	    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	    String hashedPassword = encoder.encode(plainPassword);
	    users.setPassword(hashedPassword);
	    this.usersRepository.save(users);
	}
	
}
