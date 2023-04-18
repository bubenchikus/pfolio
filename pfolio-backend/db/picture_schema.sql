CREATE TABLE picture (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL DEFAULT 'Untitled',
    about TEXT,
    category ENUM('cg-paint-left', 'cg-paint-right', 'cg-graph', 'trad', 'comics', '') default '',
    series VARCHAR(255) NOT NULL DEFAULT 'stand-alone',
    pictureUrl VARCHAR(255),
    previewUrl VARCHAR(255),
    created DATE,
    redraw BOOLEAN DEFAULT false
);