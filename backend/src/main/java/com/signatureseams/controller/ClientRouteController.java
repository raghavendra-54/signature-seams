package com.signatureseams.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Serve the React app for any non-API path so client-side routing works.
 */
@Controller
public class ClientRouteController {

    @RequestMapping(value = {
            "/", 
            "/{path:[^\\.]*}",
            "/**/{path:[^\\.]*}"
    })
    public String forwardToIndex() {
        return "forward:/index.html";
    }
}
