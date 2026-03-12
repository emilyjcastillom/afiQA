-- Seed data for fanatic_game_config table
INSERT INTO fanatic_game_config (key, value, description) VALUES
  ('tries_per_user_per_game', '3', 'The amount of tries a user gets per game to find the corect answer.'),
  ('tries_per_user_per_day', '1', 'The amount of tries a user gets per day to guess the answer. (Cooldown)'),
  ('first_day_mult', '10', 'If a user guesses the correct answer on day one his score will be multiplied by this.'),
  ('mult_decrease_per_day', '1', 'For each day that the user does not guess the answer their mult decreases by this rate'),
  ('days_between_riddles', '1', 'The amount of days between the release of each riddle.'),
  ('correct_answer_threashold', '0.8', 'The threashold for which an answer is marked as exact coincidence. (0.0 - 1.0)'),
  ('base_max_point_reward', '1000', 'The points, before multiplier, awarded to a player when he correctly guesses an answer.');
