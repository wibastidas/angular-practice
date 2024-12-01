import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, ElementRef } from '@angular/core';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `<div appHighlight>Test</div>`
})
class TestComponent {}

describe('HighlightDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let divElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [HighlightDirective]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    divElement = fixture.debugElement.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change background color on mouseenter', () => {
    // Arrange

    // Act
    divElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();

    // Assert
    expect(divElement.style.backgroundColor).toBe('yellow');
  });

  it('should remove background color on mouseleave', () => {
    // Arrange

    // Act
    divElement.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    divElement.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();

    // Assert
    expect(divElement.style.backgroundColor).toBe('');
  });
});
