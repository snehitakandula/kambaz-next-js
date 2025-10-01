"use client";

import Form from "react-bootstrap/Form";
import { Col, Row, FormSelect, FormCheck, FormLabel, InputGroup, FormControl, Button } from "react-bootstrap";
import FormRange from "react-bootstrap/FormRange";
import InputGroupText from "react-bootstrap/InputGroupText";

export default function BootstrapForms() {
  return (
    <div>
      {/* Basic form */}
      <div id="wd-css-styling-forms">
        <h2>Forms</h2>
        <Form>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="name@example.com" />

          <Form.Label>Example textarea</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form>
      </div>

      {/* Dropdowns */}
      <div id="wd-css-styling-dropdowns">
        <h3>Dropdowns</h3>
        <FormSelect>
          <option value="0" defaultChecked>
            Open this select menu
          </option>
          <option value="1">One</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </FormSelect>
      </div>

      {/* Switches */}
      <div id="wd-css-styling-switches">
        <h3>Switches</h3>
        <FormCheck type="switch" label="Unchecked switch checkbox input" />
        <FormCheck type="switch" defaultChecked label="Checked switch checkbox input" />
        <FormCheck type="switch" disabled label="Unchecked disabled switch checkbox input" />
        <FormCheck type="switch" defaultChecked disabled label="Checked disabled switch checkbox input" />
      </div>

      {/* Range */}
      <div id="wd-css-styling-range-and-sliders">
        <h3>Range</h3>
        <FormLabel>Example range</FormLabel>
        <FormRange min="0" max="5" step="0.5" />
      </div>

      {/* Addons */}
      <div id="wd-css-styling-addons">
        <h3>Addons</h3>
        <InputGroup className="mb-3">
          <InputGroupText>$</InputGroupText>
          <InputGroupText>0.00</InputGroupText>
          <FormControl />
        </InputGroup>
        <InputGroup>
          <FormControl />
          <InputGroupText>$</InputGroupText>
          <InputGroupText>0.00</InputGroupText>
        </InputGroup>
      </div>

      {/* Responsive forms */}
      <div id="wd-css-responsive-forms-1">
        <h3>Responsive forms</h3>

        <Form.Group as={Row} className="mb-3" controlId="email1">
          <FormLabel column sm={2}>Email</FormLabel>
          <Col sm={10}>
            <FormControl type="email" defaultValue="email@example.com" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="password1">
          <FormLabel column sm={2}>Password</FormLabel>
          <Col sm={10}>
            <FormControl type="password" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="textarea2">
          <FormLabel column sm={2}>Bio</FormLabel>
          <Col sm={10}>
            <FormControl as="textarea" style={{ height: "100px" }} />
          </Col>
        </Form.Group>
      </div>

      {/* Responsive forms 2 */}
      <div id="wd-css-responsive-forms-2">
        <h3>Responsive forms 2</h3>
        <Form>
          <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
            <FormLabel column sm={2}> Email </FormLabel>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
            <FormLabel column sm={2}> Password </FormLabel>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" />
            </Col>
          </Form.Group>

          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <FormLabel as="legend" column sm={2}> Radios </FormLabel>
              <Col sm={10}>
                <FormCheck type="radio" label="First radio" name="formHorizontalRadios" defaultChecked />
                <FormCheck type="radio" label="Second radio" name="formHorizontalRadios" />
                <FormCheck type="radio" label="Third radio" name="formHorizontalRadios" />
                <FormCheck type="radio" label="Remember me" name="formHorizontalRadios" />
              </Col>
            </Form.Group>
          </fieldset>

          <Col>
            <Button type="submit">Sign in</Button>
          </Col>
        </Form>
      </div>
    </div>
  );
}
