package agetjava.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import agetjava.dto.ProductDTO;
import agetjava.entity.Product;
import agetjava.service.ProductService;
import agetjava.utils.AgetUtils;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class ProductsController {

	
	@Autowired
	private ProductService productService;
	
	
	@GetMapping("/getall")
	public ResponseEntity<?> findAllByOrderByIdDesc(Pageable page) {
		return AgetUtils.responseBody("api/getall", "Product", new ArrayList<>(Arrays.asList(productService.findAllByOrderByProductIdDesc(page))));
	}
	
	@PostMapping("/addProduct")
	public void save(@RequestBody Product product){productService.save(product); }
	
	@PutMapping("/addProduct")
	public void update(@RequestBody Product product) {productService.save(product);}
	
	@GetMapping("/findById")
	public Optional<Product> findById(@RequestParam("productId") Long productId){
		return productService.findById(productId);
	}
	
	@DeleteMapping("/deleteById")
	public void delete(@RequestParam("productId") Long productId) {
		productService.delete(productId);
	}
	
	@GetMapping("/getAllProductCount")
	public ProductDTO getProducts(){
		return productService.getAllProduct();
	}
	
}
