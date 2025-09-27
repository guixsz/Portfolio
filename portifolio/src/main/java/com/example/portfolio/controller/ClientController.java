package com.example.portfolio.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.portfolio.dto.ClientRequest;
import com.example.portfolio.model.Client;
import com.example.portfolio.service.ClientService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/client")
@CrossOrigin("*")
public class ClientController {
    
    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }

    @PostMapping()
    public ResponseEntity<Client> createClient(@Valid @RequestBody ClientRequest client) {
        Client newClient = clientService.createClient(client);
        return ResponseEntity.status(HttpStatus.CREATED).body(newClient);
    }
}
