<?php

namespace Drupal\misk_contact_us\Controller;

use Drupal\Core\Controller\ControllerBase;
use Drupal\Core\Datetime\DateFormatterInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

class ContactUsController extends ControllerBase {

  protected DateFormatterInterface $dateFormatter;


  public function result() {
    $query = \Drupal::database()
      ->select('misk_contact_us_submissions', 's');

    $query->fields('s', [
      'id',
      'name',
      'email',
      'age',
      'message',
      'created',
    ]);

    $query->orderBy('created', 'DESC');

    $results = $query->execute()->fetchAll();

    $rows = [];

    foreach ($results as $result) {
      $rows[] = [
        'id' => $result->id,
        'name' => $result->name,
        'email' => $result->email,
        'age' => $result->age,
        'message' => $result->message,
        'created' => \Drupal::service('date.formatter')
          ->format($result->created, 'short'),
      ];
    }

    return [
  '#theme' => 'contact_results',
  '#title' => $this->t('Form Results'),
  '#submissions' => $rows,
  '#attached' => [
    'library' => [
      'misk_contact_us/contact_results',
    ],
  ],
  '#cache' => [
    'max-age' => 0,
  ],
];

  }
}
