package com.example.QuestionnaireModule.database.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Entity
public class QuestionnaireEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    private boolean published;
    private LocalDateTime validFrom;
    private LocalDateTime validTo;

    @ElementCollection
    @CollectionTable(name = "questionnaire_tags", joinColumns = @JoinColumn(name = "questionnaire_id"))
    private List<String> tags;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "questionnaire", orphanRemoval = true)
    @OrderBy("position")
    @JsonManagedReference
    private final List<QuestionEntity> questions = new ArrayList<>();


    public QuestionnaireEntity() {}

    public QuestionnaireEntity(Long id) {
        this.id = id;
    }

    public QuestionnaireEntity(String title, String description) {
        this.title = title;
        this.description = description;
    }

    public QuestionnaireEntity(Long id, String title, String description, boolean published, LocalDateTime validFrom, LocalDateTime validTo, List<String> tags, List<QuestionEntity> questions) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.published = published;
        this.validFrom = validFrom;
        this.validTo = validTo;
        this.tags = tags;
        this.questions.addAll(questions);
    }


    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public List<QuestionEntity> getQuestions() { return questions; }

    public boolean isPublished() {
        return published;
    }

    public LocalDateTime getValidFrom() {
        return validFrom;
    }

    public LocalDateTime getValidTo() {
        return validTo;
    }

    public List<String> getTags() {
        return tags;
    }
}
