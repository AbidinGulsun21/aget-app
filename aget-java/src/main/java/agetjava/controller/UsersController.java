package agetjava.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import agetjava.entity.Users;
import agetjava.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UsersController {

	@Autowired
	private UserService userService;

	@GetMapping("/getall")
	public List<Users> getAll() {
		return this.userService.getAll();
	}

	@GetMapping("/findOneUser")
	public Optional<Users> findOneUser(@RequestParam String username) {
		return this.userService.getUsername(username);
	}

	@PostMapping("/login")
	public void login(@RequestBody Users user) throws Exception {
		Optional<Users> optionalUser = this.userService.getUsername(user.getUsername());
		if (optionalUser.isPresent()) {
			Users existingUser = optionalUser.get();
			BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
			if (encoder.matches(user.getPassword(), existingUser.getPassword())) {
				System.out.println("işlem başarılı");
			} else {
				throw new Exception("Hatalı işlem kullanıcı adu yada şifre yanlış");
			}
		} else {
			throw new Exception("Kullanıcı bulunamadı");
		}
	}

	@PostMapping("/create")
	public void addUser(@RequestBody Users users) {
		this.userService.addUser(users);
	}
}