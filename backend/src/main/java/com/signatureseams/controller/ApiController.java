package com.signatureseams.controller;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.signatureseams.model.Address;
import com.signatureseams.model.Measurement;
import com.signatureseams.model.OrderEntity;
import com.signatureseams.model.Product;
import com.signatureseams.model.User;
import com.signatureseams.repository.AddressRepository;
import com.signatureseams.repository.MeasurementRepository;
import com.signatureseams.repository.OrderRepository;
import com.signatureseams.repository.ProductRepository;
import com.signatureseams.repository.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ApiController {

    private final UserRepository userRepo;
    private final ProductRepository productRepo;
    private final MeasurementRepository measurementRepo;
    private final OrderRepository orderRepo;
    private final AddressRepository addressRepo;

    public ApiController(
            UserRepository userRepo,
            ProductRepository productRepo,
            MeasurementRepository measurementRepo,
            OrderRepository orderRepo,
            AddressRepository addressRepo
    ) {
        this.userRepo = userRepo;
        this.productRepo = productRepo;
        this.measurementRepo = measurementRepo;
        this.orderRepo = orderRepo;
        this.addressRepo = addressRepo;

        seedProducts();
    }

    // --------------------------------------------------------------------
    // PRODUCT SEEDING (8 MATERIALS)
    // --------------------------------------------------------------------
    private void seedProducts() {
        if (productRepo.count() > 0) {
            return;
        }

        Product p1 = new Product();
        p1.setTitle("Light Blue Check Cotton");
        p1.setDescription("Light-blue checked premium cotton fabric, soft and breathable for shirts.");
        p1.setPrice(new BigDecimal("499.00"));
        p1.setImageRaw("/assets/skybluefabric.jpg");
        p1.setImageTailored("/assets/skyblueshirt.jpg");
        productRepo.save(p1);

        Product p2 = new Product();
        p2.setTitle("Beige Pinstripe Cotton");
        p2.setDescription("Beige pinstripe lightweight cotton, airy and ideal for summer wear.");
        p2.setPrice(new BigDecimal("799.00"));
        p2.setImageRaw("/assets/greyfabric.jpg");
        p2.setImageTailored("/assets/greyfabricshirt.jpg");
        productRepo.save(p2);

        Product p3 = new Product();
        p3.setTitle("Sky-Blue Fine-Stripe Cotton");
        p3.setDescription("Sky-blue fine-striped high-quality cotton shirting fabric, smooth finish.");
        p3.setPrice(new BigDecimal("1299.00"));
        p3.setImageRaw("/assets/bluecloth.jpg");
        p3.setImageTailored("/assets/blueshirt.jpg");
        productRepo.save(p3);

        Product p4 = new Product();
        p4.setTitle("Crisp White Poplin Cotton");
        p4.setDescription("white poplin premium cotton, perfect for formal shirts.");
        p4.setPrice(new BigDecimal("599.00"));
        p4.setImageRaw("/assets/whitefabric.jpg");
        p4.setImageTailored("/assets/whiteshirt.jpg");
        productRepo.save(p4);

        Product p5 = new Product();
        p5.setTitle("black and charcoal mix Designer Cotton");
        p5.setDescription("Deep-black textured premium cotton-blend, ideal for designer suits.");
        p5.setPrice(new BigDecimal("699.00"));
        p5.setImageRaw("/assets/blacksuitfabric.png");
        p5.setImageTailored("/assets/blacksuit.png");
        productRepo.save(p5);

        Product p6 = new Product();
        p6.setTitle("Denim-Blue Twill Cotton");
        p6.setDescription("Denim-blue sturdy cotton twill, durable and casual-grade.");
        p6.setPrice(new BigDecimal("899.00"));
        p6.setImageRaw("/assets/jeansfabric.jpg");
        p6.setImageTailored("/assets/jeanspant.jpg");
        productRepo.save(p6);

        Product p7 = new Product();
        p7.setTitle("Black Satin-Feel Cotton");
        p7.setDescription("Black satin-finish cotton-blend with a rich, smooth handfeel.");
        p7.setPrice(new BigDecimal("1199.00"));
        p7.setImageRaw("/assets/blackfabric.png");
        p7.setImageTailored("/assets/blackshirt.jpg");
        productRepo.save(p7);

        Product p8 = new Product();
        p8.setTitle("Grey jeans Cotton");
        p8.setDescription("Mid-grey fine-weave premium cotton suitable for Jeans Pants.");
        p8.setPrice(new BigDecimal("449.00"));
        p8.setImageRaw("/assets/greyjeansfabric.jpg");
        p8.setImageTailored("/assets/greyjeanspant.jpeg");
        productRepo.save(p8);
    }

    // --------------------------------------------------------------------
    // AUTH: REGISTER / LOGIN / GUEST LOGIN
    // --------------------------------------------------------------------

    // REGISTER: name, phone, password – required
    @PostMapping("/auth/register")
    public ResponseEntity<?> register(@RequestBody Map<String, String> body) {
        try {
            String phone = body.getOrDefault("phone", "").trim();
            String password = body.getOrDefault("password", "").trim();
            String name = body.getOrDefault("name", "").trim();

            if (phone.isEmpty() || password.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(Map.of(
                                "ok", false,
                                "error", "Phone and password are required"
                        ));
            }

            if (userRepo.findByPhone(phone).isPresent()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(Map.of(
                                "ok", false,
                                "error", "Phone already registered"
                        ));
            }

            User user = new User();
            user.setPhone(phone);
            user.setPassword(password);
            user.setName(name);
            // createdAt is LocalDateTime in your entity
            user.setCreatedAt(LocalDateTime.now());
            userRepo.save(user);

            return ResponseEntity.ok(Map.of(
                    "ok", true,
                    "userId", user.getId(),
                    "name", user.getName(),
                    "phone", user.getPhone()
            ));
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of(
                            "ok", false,
                            "error", "server error",
                            "message", ex.getMessage()
                    ));
        }
    }

    // LOGIN: only registered users (phone + password)
    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            String phone = body.getOrDefault("phone", "").trim();
            String password = body.getOrDefault("password", "").trim();

            if (phone.isEmpty() || password.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("ok", false, "error", "Phone and password are required"));
            }

            Optional<User> uOpt = userRepo.findByPhone(phone);
            if (uOpt.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("ok", false, "error", "User not found"));
            }

            User user = uOpt.get();
            if (user.getPassword() == null || !user.getPassword().equals(password)) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("ok", false, "error", "Invalid password"));
            }

            return ResponseEntity.ok(Map.of(
                    "ok", true,
                    "userId", user.getId(),
                    "name", user.getName(),
                    "phone", user.getPhone()
            ));
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "error", "server error"));
        }
    }

    // GUEST LOGIN: only with phone; creates user if not existing (no password)
    @PostMapping("/auth/guest-login")
    public ResponseEntity<?> guestLogin(@RequestBody Map<String, String> body) {
        try {
            String phone = body.getOrDefault("phone", "").trim();
            if (phone.isEmpty()) {
                return ResponseEntity
                        .status(HttpStatus.BAD_REQUEST)
                        .body(Map.of("ok", false, "error", "Phone is required"));
            }

            User user = userRepo.findByPhone(phone).orElseGet(() -> {
                User nu = new User();
                nu.setPhone(phone);
                nu.setName("");
                nu.setPassword(null);
                nu.setCreatedAt(LocalDateTime.now());
                return userRepo.save(nu);
            });

            return ResponseEntity.ok(Map.of(
                    "ok", true,
                    "userId", user.getId(),
                    "name", user.getName(),
                    "phone", user.getPhone(),
                    "guest", true
            ));
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "error", "server error"));
        }
    }

    // --------------------------------------------------------------------
    // PRODUCTS
    // --------------------------------------------------------------------

    @GetMapping("/products")
    public List<Product> products() {
        return productRepo.findAll();
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<?> product(@PathVariable Long id) {
        return productRepo.findById(id)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("ok", false, "error", "Product not found")));
    }

    // --------------------------------------------------------------------
    // MEASUREMENTS (14 fields handled on frontend; a few stored)
    // --------------------------------------------------------------------

    @PostMapping("/measurements")
    public ResponseEntity<?> saveMeasurements(@RequestBody Measurement m) {
        try {
            // createdAt is Instant in your entity
            m.setCreatedAt(Instant.now());
            Measurement saved = measurementRepo.save(m);
            return ResponseEntity.ok(saved);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "error", "Could not save measurements"));
        }
    }

    // --------------------------------------------------------------------
    // ADDRESS
    // --------------------------------------------------------------------

    @PostMapping("/addresses")
    public ResponseEntity<?> saveAddress(@RequestBody Address a) {
        try {
            Address saved = addressRepo.save(a);
            return ResponseEntity.ok(saved);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "error", "Could not save address"));
        }
    }

    // --------------------------------------------------------------------
    // ORDERS + PAYMENT (COD ONLY)
    // --------------------------------------------------------------------

    @PostMapping("/orders")
    public ResponseEntity<?> createOrder(@RequestBody OrderEntity o) {
        try {
            if (o.getAmount() == null) {
                o.setAmount(BigDecimal.ZERO);
            }
            o.setStatus("CREATED");
            // createdAt is Instant in your entity
            o.setCreatedAt(Instant.now());
            OrderEntity saved = orderRepo.save(o);
            return ResponseEntity.ok(saved);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("ok", false, "error", "Could not create order"));
        }
    }

    @PostMapping("/orders/{id}/pay-cod")
    public ResponseEntity<?> payCashOnDelivery(@PathVariable Long id) {
        Optional<OrderEntity> oi = orderRepo.findById(id);
        if (oi.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(Map.of("ok", false, "error", "Order not found"));
        }
        OrderEntity order = oi.get();
        order.setStatus("COD_CONFIRMED");
        order.setPaidAt(null); // COD, so not paid yet
        orderRepo.save(order);
        return ResponseEntity.ok(order);
    }

    @GetMapping("/orders")
    public List<OrderEntity> listOrders() {
        return orderRepo.findAll();
    }
}
