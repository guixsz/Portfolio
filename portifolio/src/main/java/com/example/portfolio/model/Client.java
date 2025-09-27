package com.example.portfolio.model;

import com.example.portfolio.dto.ClientRequest;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;

@Entity
@Table(name = "clients")
public class Client {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String number;
    private String message;

    @Email
    private String email;

    public Client() {}

    public Client(ClientRequest client) {
        this.name = client.name();
        this.number = client.number();
        this.message = client.message();
        this.email = client.email();
    }

}
