package agetjava.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import agetjava.entity.Users;

import java.util.Optional;


@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
	
    Optional<Users> findByUsername(String username);

	
	

}

