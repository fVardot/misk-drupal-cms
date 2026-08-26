<?php

declare(strict_types=1);

namespace Drupal\misk_news\Controller;

use Drupal\Core\Controller\ControllerBase;

class MiskNewsController extends ControllerBase {

  /**
   * Displays all news.
   */
  public function news(): array {
    $config = $this->config('misk_news.settings');

    $items_per_page = $config->get('items_per_page') ?: 12;
    $sort = $config->get('sort') ?: 'DESC';

    $query = $this->entityTypeManager()
      ->getStorage('node')
      ->getQuery()
      ->accessCheck(TRUE)
      ->condition('type', 'news')
      ->condition('status', 1)
      ->sort('created', $sort)
      ->pager($items_per_page);

    $nids = $query->execute();

    if (!$nids) {
      return [
        '#markup' => $this->t('No news articles found.'),
      ];
    }

    $nodes = $this->entityTypeManager()
      ->getStorage('node')
      ->loadMultiple($nids);

    $view_builder = $this->entityTypeManager()
      ->getViewBuilder('node');

    return [
  '#attached' => [
    'library' => [
      'misk_news/news',
    ],
  ],
  'news' => [
    '#type' => 'container',
    '#attributes' => [
      'class' => ['news-grid'],
    ],
    'items' => $view_builder->viewMultiple($nodes, 'card'),
  ],
  'pager' => [
    '#type' => 'pager',
  ],
  '#cache' => [
    'tags' => ['config:misk_news.settings'],
  ],
];

  }

}
