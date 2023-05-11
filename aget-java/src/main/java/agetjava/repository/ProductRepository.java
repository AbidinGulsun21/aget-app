package agetjava.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import agetjava.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
	
	public Page<Product> findAllByOrderByProductIdDesc(Pageable page);
	
	@Query(value = "SELECT COUNT(*) from products" , nativeQuery = true)
	Integer productCount();
}
