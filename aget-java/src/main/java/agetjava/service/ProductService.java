package agetjava.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import agetjava.dto.ProductDTO;
import agetjava.entity.Product;
import agetjava.repository.ProductRepository;


@Service
public class ProductService {

	
	@Autowired
	private ProductRepository productRepository;
	
	public List<Product> getAll(){return productRepository.findAll();}
	
	
	 public Page<Product> findAllByOrderByProductIdDesc(Pageable page) {
	        return (Page<Product>) productRepository.findAllByOrderByProductIdDesc(page);
	 }
	 
	 public void save(Product product) {
		 product.setCreationDate(LocalDateTime.now());
		 productRepository.save(product);
	 }
	 
	 public void update(Product product) {
		 productRepository.save(product);
	 }
	 
	 public Optional<Product> findById(Long id) {
		 return productRepository.findById(id);
	 }
	 
	 public void delete(Long productId) {
		 productRepository.deleteById(productId);
	 }
	 
	 
	 public ProductDTO getAllProduct() {
		 ProductDTO productDTO = new ProductDTO();
		 
		 int countProduct=0;
		 countProduct = productRepository.productCount();
		 
		 productDTO.setProductCount(countProduct);
		 
		 return productDTO;
		 
	 }
	 
	 
	 
	 
}
