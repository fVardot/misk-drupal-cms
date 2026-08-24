<?php


namespace Drupal\misk_contact_us\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;

class ContactForm extends FormBase {

  public function getFormId(): string {
    return 'contact_us_form';
  }

  public function buildForm(array $form, FormStateInterface $form_state): array {

  
  $form['#attributes']['class'][] = 'contact-us-form';

  $form['#attached']['library'][] = 'misk_contact_us/contact_form';

    $form['name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Name'),
      '#required' => TRUE,
    ];

    $form['email'] = [
      '#type' => 'email',
      '#title' => $this->t('Email'),
      '#required' => TRUE,
    ];

    $form['age'] = [
      '#type' => 'number',
      '#title' => $this->t('Age'),
      '#required' => TRUE,
    ];

    $form['message'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Message'),
      '#required' => TRUE,
    ];

    $form['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Send'),
    ];

    return $form;
  }

  public function submitForm(array &$form, FormStateInterface $form_state): void {
     $data=[
      'name' => $form_state->getValue('name'),
      'email' => $form_state->getValue('email'),
      'age' => $form_state->getValue('age'),
      'message' => $form_state->getValue('message'),
      'created' => \Drupal::time()->getRequestTime(),
    ];

  \Drupal::database()
    ->insert('misk_contact_us_submissions')
    ->fields($data)
    ->execute();

  $this->messenger()->addStatus(
    $this->t('Your message has been submitted successfully.')
  );

 // $form_state->setRedirect('misk_contact_us.result');

  }

public function validateForm(array &$form, FormStateInterface $form_state): void {

  $name = trim($form_state->getValue('name'));
  $email = trim($form_state->getValue('email'));
  $age = $form_state->getValue('age');
  $message = $form_state->getValue('message');

  // Name: letters and spaces only.
  if (!preg_match('/^[\p{L} ]+$/u', $name)) {
    $form_state->setErrorByName(
      'name',
      $this->t('Name can contain letters and spaces only.')
    );
  }

  if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $form_state->setErrorByName(
      'email',
      $this->t('Please enter a valid email address.')
    );
  }

  if ($age < 18) {
    $form_state->setErrorByName(
      'age',
      $this->t('Age must be at least 18.')
    );
  }

  if ($message !== strip_tags($message)) {
    $form_state->setErrorByName(
      'message',
      $this->t('HTML or code is not allowed in the message.')
    );
  }

  if (preg_match('/<script\b|javascript\s*:|on\w+\s*=|<iframe\b|<object\b|<embed\b/i', $message)) {
    $form_state->setErrorByName(
      'message',
      $this->t('Scripts or code are not allowed in the message.')
    );
  }

}


}
