CREATE TABLE description (
    id INT PRIMARY KEY AUTO_INCREMENT,
    txt TEXT,
    category ENUM(
        'cg-paint-left',
        'cg-paint-right',
        'cg-graph',
        'trad',
        'comics',
        'page',
        'no-category'
    ) NOT NULL DEFAULT 'no-category',
    series VARCHAR(255) DEFAULT 'stand-alone',
    arrangement INT DEFAULT 0,
    UNIQUE (category, series)
);
INSERT INTO description(category)
VALUES ('cg-paint-left'),
    ('cg-paint-right'),
    ('cg-graph'),
    ('trad'),
    ('comics');
INSERT INTO description(category, series)
VALUES ('page', 'art'),
    ('page', 'dev'),
    ('page', 'journal'),
    ('page', 'about');