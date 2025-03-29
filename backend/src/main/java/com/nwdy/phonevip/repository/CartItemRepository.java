package com.nwdy.phonevip.repository;

import com.nwdy.phonevip.dto.response.CartItemDTO;
import com.nwdy.phonevip.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Query("SELECT new com.nwdy.phonevip.dto.response.CartItemDTO(ci.id, p.name, p.imageUrl, p.price, ci.quantity, ci.selected) " +
            "FROM CartItem ci " +
            "JOIN ci.product p " +
            "JOIN ci.cart c " +
            "JOIN c.user u " +
            "WHERE u.username = :username")
    List<CartItemDTO> findByUsername(@Param("username") String username);

    Optional<CartItem> findByIdAndCart_User_Username(Long id, String username);
}
