<?php

declare(strict_types=1);

namespace Drupal\misk_news\Controller;

use Drupal\Core\Controller\ControllerBase;

/**
 * Returns responses for Misk news routes.
 */
final class MiskNewsController extends ControllerBase {

  /**
   * Builds the response.
   */
  public function __invoke(): array {

  $query = $this->entityTypeManager()->getStorage('node')->getQuery()
  ->accessCheck()
  ->condition('type', 'news')
  ->condition('status', 1)
  ->sort('created', 'DESC');

  $node_ids = $query->execute();
  $nodes = $this->entityTypeManager()->getStorage('node')->loadMultiple($node_ids);

  $news = [];
  $news_card = [];

  $view_builder = $this->entityTypeManager()->getViewBuilder('node');

  foreach ($nodes as $node) {

    $news[$node->id()] = [];
    $news[$node->id()]['title'] = [
      '#markup' => $node->label(),
    ];

    $news[$node->id()]['url'] = $node->get('field_news_url')->view(['label'=>'hidden']);

    $news_card[] = $view_builder->view($node, 'card');
  }

    $build['content'] = [

      'news' => [
        '#theme' => 'news_list',
        '#news' => $news,
      ],
      'news_card' => $news_card,
    ];

    return $build;
  }

}
