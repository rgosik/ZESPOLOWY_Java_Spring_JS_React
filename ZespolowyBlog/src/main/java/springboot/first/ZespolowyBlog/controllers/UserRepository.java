package springboot.first.ZespolowyBlog.controllers;

import org.springframework.data.jpa.repository.JpaRepository;
import springboot.first.ZespolowyBlog.models.User;

interface UserRepository extends JpaRepository<User, Long> {

}