<?php

declare(strict_types=1);

namespace Drupal\misk_news\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

class MiskNewsSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames(): array {
    return [
      'misk_news.settings',
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId(): string {
    return 'misk_news_settings_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state): array {
    $config = $this->config('misk_news.settings');

    $form['items_per_page'] = [
      '#type' => 'number',
      '#title' => $this->t('Items per page'),
      '#default_value' => $config->get('items_per_page') ?: 6,
      '#min' => 1,
      '#required' => TRUE,
    ];

    $form['sort'] = [
      '#type' => 'select',
      '#title' => $this->t('Sort order'),
      '#options' => [
        'DESC' => $this->t('Newest first'),
        'ASC' => $this->t('Oldest first'),
      ],
      '#default_value' => $config->get('sort') ?: 'DESC',
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state): void {
    $this->config('misk_news.settings')
      ->set('items_per_page', $form_state->getValue('items_per_page'))
      ->set('sort', $form_state->getValue('sort'))
      ->save();

    parent::submitForm($form, $form_state);
  }

}
